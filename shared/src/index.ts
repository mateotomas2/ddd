import * as figlet from "figlet";

export function logFancyText(text: string) {
  figlet.text(
    text,
    {
      font: "Cybermedium",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    },
    (err, data) => {
      if (err) {
        throw Error("Cannot create fancy text");
      }
      console.dir(data);
    }
  );
}
