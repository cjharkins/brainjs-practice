const colorPicker = document.querySelector('input');
const bgColor = document.querySelector('h1');
const net = new brain.NeuralNetwork();

const data = [ 
	{input: { r: 0.97 , g: 1 , b: 0.36  } , output: { dark: 1  } },
	{input: { r: 0.94 , g: 1 , b: 0.82 } , output: { dark: 1  } },
	{input: { r: 1   , g: 0.85 , b: 0.88 } , output: { dark: 1  } },
	{input: { r: 0.49 , g: 0.29 , b: 1 } , output: { light: 1 } },
	{input: { r: 1 , g: 0.09  , b: 0.18 } , output: { light: 1 } },
	{input: { r: 0 , g: 0  , b: 0  } , output: { light: 1 } },
	{input: { r: 0.18 , g: 1 , b: 0.31 }, output: {light: 1}}
 ];

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function convertToPercent(n) {
	const percent = n/255;
	return percent.toFixed(2);
}

colorPicker.addEventListener("input", function(e){
	let colorRGB = hexToRgb(colorPicker.value);
	let newColor = `rgb(${colorRGB.r},${colorRGB.g},${colorRGB.b})`;
	bgColor.style.backgroundColor = newColor; 
	let rChannel = convertToPercent(colorRGB.r);
	let gChannel = convertToPercent(colorRGB.g);
	let bChannel = convertToPercent(colorRGB.b);
	const output = net.run({r: rChannel, g: gChannel, b: bChannel});
	console.log(rChannel,gChannel,bChannel);
	console.log(output);
	output.dark > output.light? bgColor.style.color = 'black' :bgColor.style.color  = 'white';
});

net.train(data);


