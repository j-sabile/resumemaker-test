const { createReadStream, createWriteStream } = require('fs');
const { join } = require('path');
const latex = require('node-latex');

// Define input and output file paths
const inputFile = join(__dirname, 'test.tex');
const outputFile = join(__dirname, 'output.pdf');

// Create read and write streams for the files
const input = createReadStream(inputFile);
const output = createWriteStream(outputFile);

// Convert the LaTeX file to PDF
const pdf = latex(input);
pdf.pipe(output);

pdf.on('error', err => {
  console.error(err);
});

pdf.on('finish', () => {
  console.log('PDF conversion completed successfully!');
});