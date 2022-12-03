import * as figlet from 'figlet';

export function logFancyText(text:string) {
    figlet.text(text,{
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }, function(err: any, data: any) {
        if (err) {
            console.log(err);
            throw Error("Cannot create fancy text")
        }
        console.log(data)
    });
}
