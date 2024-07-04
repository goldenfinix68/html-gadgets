$(function () {
  const tickPositions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const numberLine = $("#numberLine");
  const point1 = $("#point1");
  const point2 = $("#point2");
  const highlightLine = $("#highlightLine");

  function snapToTick(position) {
    let closest = tickPositions[0];
    let closestDistance = Math.abs(position - closest);
    for (let tick of tickPositions) {
      let distance = Math.abs(position - tick);
      if (distance < closestDistance) {
        closest = tick;
        closestDistance = distance;
      }
    }
    return closest;
  }

  function updateHighlight() {
    const left1 = parseInt(point1.css("left"));
    const left2 = parseInt(point2.css("left"));
    const left = Math.min(left1, left2);
    const width = Math.abs(left1 - left2);

    highlightLine.css({ left: `${left}px`, width: `${width}px` });
  }

  function makeDraggable(point) {
    point.draggable({
      axis: "x",
      containment: "parent",
      drag: function (event, ui) {
        let left = (ui.position.left / numberLine.width()) * 100;
        left = snapToTick(left);
        ui.position.left = (left / 100) * numberLine.width();
        updateHighlight();
      },
      stop: function (event, ui) {
        let left = (ui.position.left / numberLine.width()) * 100;
        left = snapToTick(left);
        $(this).css("left", `${left}%`);
        updateHighlight();
      },
    });
  }

  makeDraggable(point1);
  makeDraggable(point2);
  updateHighlight();
});
