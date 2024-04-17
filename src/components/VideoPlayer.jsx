import ReactPlayer from "react-player";

export default function VideoPlayer({ url, previewImage, alt }) {
   return (
      <div>
         <ReactPlayer
            url={url}
            light={true}
            controls={true}
            height="300"
            width="500"
            config={{
               file: {
                  attributes: {
                     poster: previewImage
                  }
               }
            }}
         />
      </div>
   );
}