import React from "react"
import ContentLoader from "react-content-loader"

const CardLoader = () => (
  <div className="card-loader-container">
  <ContentLoader 
    speed={2}
    width={320}
    height={300}
    viewBox="0 0 320 300"
    backgroundColor="#ecebeb"
    foregroundColor="#d6d2d2"
  >
    <circle cx="577" cy="531" r="15" /> 
    <rect x="466" y="527" rx="2" ry="2" width="140" height="10" /> 
    <rect x="499" y="524" rx="2" ry="2" width="140" height="10" /> 
    <rect x="0" y="0" rx="2" ry="2" width="300" height="300" />
  </ContentLoader>
  </div>
)

export default CardLoader

