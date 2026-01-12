import { forwardRef } from 'react'
import clsx from 'clsx'

/**
 * Full Width Container Component
 * - Always full width with responsive padding
 * - Content inside manages its own max-width
 * - Provides consistent horizontal spacing
 */
export const Container = forwardRef(function Container(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx(
        'w-full',
        // Responsive horizontal padding
        'px-4 sm:px-6 lg:px-8 xl:px-12',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})

// Legacy exports for backwards compatibility
export const ContainerOuter = Container
export const ContainerInner = forwardRef(function InnerContainer(
  { children, ...props },
  ref,
) {
  return <div ref={ref} {...props}>{children}</div>
})
