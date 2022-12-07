import * as figlet from "figlet";
export function logFancyText(text: string, font: figlet.Fonts = "Standard") {
  return new Promise<string>((res, rej) => {
    figlet.text(
      text,
      {
        font: font,
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      },
      (err, data) => {
        if (err) {
          rej(Error("Cannot create fancy text"));
          throw Error("Cannot create fancy text");
        }
        if (data) res("\n\n" + data + "\n");
      }
    );
  });
}
