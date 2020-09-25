// A4
var r = new Rune({
    container: "body",
    width: 800,
    height: 776,
    debug: true
});

// Init the text variable
let text = "init";
const sqpx2sqcm = (8.3/680)**2;

function graphic() {

	r.image("test.jpg", 0, 0, r.width, r.height);

    const grp = r.group(0, 0); // Group to hold the polygon
    let unstarted = true; // Polygon hasn't yet been started
    let poly, initPos; // Initialising some variables

    // Reinitialise area text
    if (text != "init") { text.removeParent() }; // Remove previous area text if it exists
    text = r.text(`Area: ${0} sq cm`, 10, 30).fontSize(24).fill(255).stroke("none") // Set default text

    // When the mouse is clicked
    r.el.addEventListener('click', (mouse) => {

        // Save the mouse position in a vector
        const mousePos = new Rune.Vector(mouse.x, mouse.y);

        // If the polygon hasn't yet been started
        if (unstarted) {
            initPos = { x: mousePos.x, y: mousePos.y } // Save the initial position
            poly = r.polygon(mousePos.x, mousePos.y, grp).fill(255, 0.5).stroke(255).strokeWidth(2) // Create a polygon
            unstarted = false; // Set unstarted to false
        }

        // Draw a line to the next (or first) point
        poly.lineTo(mousePos.x - initPos.x, mousePos.y - initPos.y, true)

        // Draw a circle at that point
        r.circle(mousePos.x, mousePos.y, 5, 5).fill("none").stroke(255)

        // Update the text
        text.removeParent(); // Remove previous area text
        text = r.text(`Area: ${polyArea(poly)} sq cm`, 10, 30).fontSize(24).fill(255).stroke("none") // Add new area text

        // Redraw the canvas
        r.draw()
    })

}

// This function calculates the area inside a polygon called "poly"
// From https://stackoverflow.com/a/33670691
function polyArea(poly) {

    const vertices = poly.state.vectors;

    let total = 0;

    for (let i = 0, l = vertices.length; i < l; i++) {
        const addX = vertices[i].x;
        const addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
        const subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
        const subY = vertices[i].y;

        total += (addX * addY * 0.5);
        total -= (subX * subY * 0.5);
    }

    return (Math.abs(total) * sqpx2sqcm).toFixed(2);
}

// Draw it 
graphic();
r.draw();