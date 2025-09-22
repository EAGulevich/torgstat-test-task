import './App.css'
import ImageRotator from "./components/ImageRotator/ImageRotator.tsx";
import catImageUrl from './assets/cat.jpg'
import {type CSSProperties} from "react";


const wrapperStyles: CSSProperties = {
    height: "300px",
    width: "300px",
}


export default function App() {

  return (
          <div style={wrapperStyles}>
              <ImageRotator imageUrl={catImageUrl} />
              <video
                  style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "320px",
                  }}
                  controls
                  preload="auto"
                  autoPlay
                  loop
              >
                  <source
                      src="/frontend_test_task.mp4"
                      type="video/mp4"
                  />
                  Your browser does not support the video tag.
              </video>
          </div>

  )
}

