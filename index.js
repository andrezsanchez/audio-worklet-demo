let started = false;

async function start() {
  if (started) {
    return;
  }

  const audioContext = new AudioContext();
  const module = await audioContext.audioWorklet.addModule("processor.js");

  const myNode = new AudioWorkletNode(audioContext, "my-processor");
  myNode.connect(audioContext.destination);

  // Wait and then tell the processor to use a different base note.
  setTimeout(
    () => {
      myNode.port.postMessage(16);
    },
    2500,
  );

  started = true;
}

document.getElementById('start').addEventListener('click', start);
