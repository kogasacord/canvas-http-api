import canvas from "canvas";
import { crazy2be_word_wrap, crazy2be_word_wrap_paragraph, lilys_word_wrap, rlemons_fragmentText } from "./clip.js";

export function quote(
    ctx: canvas.CanvasRenderingContext2D,
    text: string,
    author: string,
    pfp: canvas.Image,
    overlay: canvas.Image,
) {
    ctx.drawImage(pfp, 0, 0, 720, 718);
    ctx.drawImage(overlay, 0, 0);
    ctx.fillStyle = "#d9d9d9";

    // AUTO FONT RESIZE IN COMPARISON TO THE TEXT LENGTH NEEDS TO BE CALCULATED.
    ctx.font = `bold ${60}px Times New Roman`;
    const a = crazy2be_word_wrap_paragraph(ctx, text, 450);
    let last = 300 - (a.length * 25);
    for (const s of a) {
        last += 65;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(s, 750, last, 900);
    }
    ctx.font = "40px Times New Roman"
    ctx.fillText(`- ${author}`, 1000, last + 65, 900);
}

export function quoteAttachment(
    c: canvas.Canvas,
    ctx: canvas.CanvasRenderingContext2D,
    text: string,
    author: string,
    pfp: canvas.Image,
    overlay: canvas.Image,
    attachment: canvas.Image | canvas.Canvas,
) {
    ctx.font = `bold ${60}px Times New Roman`;
    let last = 500;
    const a = crazy2be_word_wrap_paragraph(ctx, text, 450);
    ctx.drawImage(pfp, 0, 0, 720, 718);
    ctx.drawImage(overlay, 0, 0);
    ctx.fillStyle = "#d9d9d9";
    ctx.font = `bold ${30}px Times New Roman`;
    for (const s of a) {
        last += 30;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s, 970, last, 900);
    }
    ctx.font = `${25}px Times New Roman`;
    ctx.fillText(`- ${author}`, 1100, last + 40);

    const ratio = attachment.width / attachment.height;
    const width = 400;
    const height = width / ratio;
    ctx.globalAlpha = 0.9;
    ctx.drawImage(
        attachment, 
        (c.width - width) - 110, 
        (c.height - height) - 230, 
        width, 
        height);
    ctx.globalAlpha = 1;
}
