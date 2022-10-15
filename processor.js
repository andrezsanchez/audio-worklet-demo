// This file runs as an audio worklet.

const a4 = 440;

class MyProcessor extends AudioWorkletProcessor {
  /// A chromatic scale offset w.r.t. A4. Initialize to A5.
  noteOffset = 12;

  constructor() {
    super();

    this.port.onmessage = (event) => {
      this.noteOffset = event.data;
    };
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];

    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        // Calculate the current time in seconds since initialization
        // using the globals `currentFrame` and `sampleRate`.
        const t = (currentFrame + i) / sampleRate;

        // Select a note of the chromatic scale over and over as a function of time.
        const note = (Math.floor(t * 4) % 12) + this.noteOffset;

        // Produce a sample of a sine wave based on the time and note.
        channel[i] = Math.sin(t * (a4 * (2 ** (note / 12))));
      }
    });

    return true;
  }
}

registerProcessor("my-processor", MyProcessor);
