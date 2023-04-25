export async function getAverageBgColor(img:HTMLImageElement) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    if(!ctx) return "err";
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    var numPixels = pixels.length;
    var r = 0, g = 0, b = 0;

    for (var i = 0; i < numPixels; i += 4) {
        r += pixels[i];
        g += pixels[i + 1];
        b += pixels[i + 2];
    }

    r = Math.floor(r / (numPixels / 4));
    g = Math.floor(g / (numPixels / 4));
    b = Math.floor(b / (numPixels / 4));
    

    const adjusted = adjustColor(r,g,b);

    return "rgb(" + adjusted[0] + ", " + adjusted[1] + ", " + adjusted[2] + ")";
}

// make the color a little more full of life

function adjustColor(r:number, g:number, b:number) {
    // find the biggest value and make it 1.5x bigger
    let maxVal = Math.max(r, g, b);
    if (maxVal === r) {
      r *= 1.3;
    } else if (maxVal === g) {
      g *= 1.3;
    } else {
      b *= 1.3;
    }
  
    // make sure no value is negative
    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);
  
    // calculate the total and adjust the values
    let total = r + g + b;
    if (total > 255) {
      let extra = total - 255;
      if (r <= g && r <= b) {
        r -= extra/2;
        g -= extra/2;
      } else if (g <= r && g <= b) {
        g -= extra/2;
        b -= extra/2;
      } else {
        r -= extra/2;
        b -= extra/2;
      }
    }
  
    // make sure the total is exactly 255
    total = r + g + b;
    if (total !== 255) {
      let scale = 255/total;
      r *= scale;
      g *= scale;
      b *= scale;
    }
  
    // return the adjusted values
    return [Math.round(r), Math.round(g), Math.round(b)];
  }