import Vibrant from "node-vibrant";

export default function Tommy() {
  let colour;
  let va = Vibrant.from("../images/542KBPicture.jpg").getPalette(function (
    err,
    palette
  ) {});

  return (
    <div>
      <p>Testing the vibrant colour picker</p>
      <p>VA Max Count = {colour}</p>
    </div>
  );
}
