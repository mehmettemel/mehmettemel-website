import { Octokit } from '@octokit/rest'
import slugify from 'slugify'

if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN environment variable is not defined')
}

if (!process.env.GITHUB_REPO) {
  throw new Error('GITHUB_REPO environment variable is not defined')
}

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const [owner, repo] = process.env.GITHUB_REPO.split('/')
const branch = process.env.GITHUB_BRANCH || 'main'

// Map note types to folder names
const TYPE_FOLDERS = {
  link: 'linkler',
  quote: 'alintilar',
  video: 'videolar',
  book: 'kitaplar',
}

/**
 * Slugify Turkish text by converting Turkish characters to ASCII
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
function turkishSlugify(text) {
  if (!text) return ''

  const turkishMap = {
    ç: 'c',
    ğ: 'g',
    ı: 'i',
    ö: 'o',
    ş: 's',
    ü: 'u',
    Ç: 'c',
    Ğ: 'g',
    İ: 'i',
    Ö: 'o',
    Ş: 's',
    Ü: 'u',
  }

  let normalized = text
  Object.entries(turkishMap).forEach(([tr, en]) => {
    normalized = normalized.replace(new RegExp(tr, 'g'), en)
  })

  return slugify(normalized, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g })
}

/**
 * Generate markdown content for a note
 * @param {Object} note - Note object from database
 * @returns {string} Markdown content
 */
function generateMarkdown(note) {
  const {
    id,
    note_type,
    category,
    title,
    text,
    author,
    source,
    url,
    tags,
    created_at,
  } = note

  // Frontmatter (YAML)
  const frontmatter = `---
id: ${id}
type: ${note_type}
category: ${category}
${title ? `title: "${title.replace(/"/g, '\\"')}"` : ''}
author: ${author || 'null'}
source: ${source ? `"${source.replace(/"/g, '\\"')}"` : 'null'}
tags: ${JSON.stringify(tags || [])}
created_at: ${created_at}
url: ${url || 'null'}
---`

  // Main heading
  const heading = title || text.substring(0, 50).trim()

  // Body content
  let body = `\n\n# ${heading}\n\n${text}\n\n`

  // Add link for link type
  if (note_type === 'link' && url) {
    body += `[Visit Link →](${url})\n\n`
  }

  // Footer
  body += `---\nGenerated via Telegram Bot 🤖`

  return frontmatter + body
}

/**
 * Create a markdown file in GitHub for a note
 * @param {Object} note - Note object from database
 * @returns {Promise<Object>} GitHub response with path and SHA
 */
export async function createMarkdownFile(note) {
  try {
    const { note_type, category, id, title, text } = note

    if (!TYPE_FOLDERS[note_type]) {
      throw new Error(`Invalid note type: ${note_type}`)
    }

    const typeFolder = TYPE_FOLDERS[note_type]

    // Generate slug from title or text
    const sourceText = title || text
    const slug = turkishSlugify(sourceText.substring(0, 30))

    // Generate filename with timestamp to avoid conflicts
    const filename = `${slug}-${id}.md`
    const path = `notes/${typeFolder}/${category}/${filename}`

    // Generate markdown content
    const content = generateMarkdown(note)
    const contentBase64 = Buffer.from(content, 'utf-8').toString('base64')

    // Commit message
    const commitMessage = `✨ Add ${note_type}: ${title || text.substring(0, 50)}`

    // Create or update file in GitHub
    const result = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: commitMessage,
      content: contentBase64,
      branch,
    })

    return {
      path,
      sha: result.data.commit.sha,
      url: result.data.content.html_url,
    }
  } catch (error) {
    console.error('GitHub API error in createMarkdownFile:', error)
    throw new Error(`Failed to create markdown file: ${error.message}`)
  }
}

/**
 * Check if a path exists in GitHub
 * @param {string} path - File path
 * @returns {Promise<boolean>} True if exists
 */
export async function fileExists(path) {
  try {
    await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    })
    return true
  } catch (error) {
    if (error.status === 404) {
      return false
    }
    throw error
  }
}

/**
 * Get file content from GitHub
 * @param {string} path - File path
 * @returns {Promise<string>} File content
 */
export async function getFileContent(path) {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    })

    const content = Buffer.from(response.data.content, 'base64').toString('utf-8')
    return content
  } catch (error) {
    console.error('GitHub API error in getFileContent:', error)
    throw new Error(`Failed to get file content: ${error.message}`)
  }
}
