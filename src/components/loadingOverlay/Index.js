import ReactLoading from 'react-loading'

import './styles.scss'

function LoadingOverlay(props) {
  const { type, width } = props

  return (
    <div className="loading-container">
      <ReactLoading 
        type={ type ?? 'spinningBubbles' } 
        width={ width ?? 100 }
      />
    </div>
  )
}

export default LoadingOverlay