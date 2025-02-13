export default class Triangle {
    p1: number;
    p2: number;
    p3: number;
    fillColor: string;

    constructor(p1:number, p2:number, p3:number, fillColor:string) {
        Object.assign(this, { p1, p2, p3, fillColor });
    }

    //moves triangles position based on audio data
    update() {
        // keep a reference to the analyser node
        //let analyserNode;

        // this is the array where the analyser data will be stored
        //let audioData = new Uint8Array(analyserNode.fftSize / 2);
        //analyserNode.getByteFrequencyData(audioData);

                /*for (let i = 0; i < audioData.length; i += 3) {
            this.p1 += audioData[i];
            this.p2 += audioData[i + 1];
            this.p3 += audioData[i + 2];
        }*/

        //let canvasElement;
       //let canvasHeight = canvasElement.height;

        this.p1++;
        this.p2++;
        this.p3++;

        //loops the triangle around the screen if it goes out of bounds. 
        /*if (this.p1 > canvasHeight || this.p2 > canvasHeight || this.p3 > canvasHeight){
            this.p1 = 0;
            this.p2 = -50;
            this.p3 = 50;
        }*/
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(100,0);
        ctx.rotate(Math.PI/4);
        ctx.moveTo(this.p1, this.p2);
        ctx.lineTo(this.p2, this.p3);
        ctx.lineTo(this.p3, this.p1);
        ctx.closePath();
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.restore();
    }
}