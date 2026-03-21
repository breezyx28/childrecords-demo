// Function to load and display the PDF content
const PdfViewer = (url: string) => {
  var pdfPreview = document.getElementById("pdfPreview");

  // Create an <embed> element to display the PDF
  var embed = document.createElement("embed");
  embed.src = url;
  embed.type = "application/pdf";
  embed.width = "100%";
  embed.height = "100%";

  // Clear previous content and append the <embed> element
  pdfPreview!.innerHTML = "";
  pdfPreview!.appendChild(embed);
};

export default PdfViewer;
