import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'

const ScrollToTopButton = ({ show }: { show: boolean }) => {
  const $portalRoot = document.getElementById('root-portal')
  if ($portalRoot == null) {
    return null
  }
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (show) {
    return createPortal(
      <ToTopBtn onClick={handleClick}>Top</ToTopBtn>,
      $portalRoot,
    )
  }
}

const ToTopBtn = styled.button`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  background-color: ${colors.blue980};
  padding: 8px 8px;
  border-radius: 20%;
  cursor: pointer;
  color: white;
  font-weight: bolder;
`

export default ScrollToTopButton
