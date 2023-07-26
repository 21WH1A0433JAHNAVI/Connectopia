import React from 'react'
import { useState } from 'react';
import { Excalidraw } from "@excalidraw/excalidraw";

function ExcalidrawBoard() {
const [excalidrawAPI, setExcalidrawAPI] = useState(null);
const [isCollaborating, setIsCollaborating] = useState(false);
function LiveCollaborationTrigger() {
  return (
    <div style={{ height: "500px" }}>
      <Excalidraw
        renderTopRightUI={() => {
          return (
            <button
              style={{
                background: "#70b1ec",
                border: "none",
                color: "#fff",
                width: "max-content",
                fontWeight: "bold",
              }}
              onClick={() => window.alert("This is dummy top right UI")}
            >
              Click me
            </button>
          );
        }}
      />
    </div>
  );
  }
  return (
    <div>
      {true ? <div style={{ height: "500px" }}>
      <p style={{ fontSize: "16px" }}>
        Selecting the checkbox to see the collaborator count
      </p>
      <label style={{ fontSize: "16px", fontWeight: "bold" }}>
        <input
          type="checkbox"
          checked={isCollaborating}
          onChange={() => {
            if (!isCollaborating) {
              const collaborators = new Map();
              collaborators.set("id1", {
                username: "Doremon",
                avatarUrl: "../../../../img/doremon.png",
              });
              collaborators.set("id3", {
                username: "Pika",
                avatarUrl: "../../../../img/pika.jpeg",
              });
              excalidrawAPI.updateScene({ collaborators });
            } else {
              excalidrawAPI.updateScene({
                collaborators: new Map(),
              });
            }
            setIsCollaborating(!isCollaborating);
          }}
        />
        Show Collaborators
      </label>
      <Excalidraw
        ref={(api) => setExcalidrawAPI(api)}
        renderTopRightUI={() => (
          <LiveCollaborationTrigger
            isCollaborating={isCollaborating}
            onSelect={() => {
              window.alert("You clicked on collab button");
              setIsCollaborating(true);
            }}
          />
        )}
      ></Excalidraw>
    </div>

      : <div></div>}
    </div>
  )
}

export default ExcalidrawBoard
