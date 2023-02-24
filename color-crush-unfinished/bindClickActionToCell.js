function bindClickActionToCell() {
  document.body.addEventListener("click", handleClick);

  function handleClick(event) {
    const elementClicked = event.target;
    const isTargetACell =
      elementClicked.hasAttribute("data-cellIndex") &&
      elementClicked.hasAttribute("data-rowIndex");

    if (isTargetACell) {
      handleClickOnCell(elementClicked);
    }
  }

  function handleClickOnCell(elementClicked) {
    const cellValueToMatch = elementClicked.getAttribute("class");
    const startingRowIndex = Number(
      elementClicked.getAttribute("data-rowIndex")
    );
    const startingCellIndex = Number(
      elementClicked.getAttribute("data-cellIndex")
    );
    const cellsThatMatch = getCellsThatMatchAndAreTouching({
      startingRowIndex,
      startingCellIndex,
      cellValueToMatch,
    });
    const isClearOut = cellsThatMatch.length >= 3;

    if (isClearOut) {
      clearOutCellThatMatchAndAreTouching(cellsThatMatch);
      renderBoard();
    }
  }

  function getCellsThatMatchAndAreTouching({
    startingRowIndex,
    startingCellIndex,
    cellValueToMatch,
  }) {

    checkCellAndAddIfMatches({
      rowIndex: startingRowIndex,
      cellIndex: startingCellIndex,
    })

    const matchingCells = [];

    return matchingCells;

    function checkCellAndAddIfMatches(rowIndex, cellIndex) {
      const isNotSeen = !matchingCells.some(
        (currentCell) =>
        currentCell.rowIndex === rowIndex && 
        currentCell.cellIndex === cellIndex
      );

      const isMatch = matrix?.(rowIndex)?.(cellIndex) === cellValueToMatch

      const isAddAndContinue = isNotSeen && isMatch;

      if(isAddAndContinue) {
        matchingCells.push({rowIndex, cellIndex});

        for(let i = -1; i<= 1; i++){
          for(let j = -1; j <= 1; j++){
            checkCellAndAddIfMatches({
              rowIndex: rowIndex + i,
              cellIndex: cellIndex + j,
            })
          }
        }
      }
    }
  }


  function clearOutCellThatMatchAndAreTouching(cellsThatMatch) {
    cellsThatMatch.forEach(({ rowIndex, cellIndex }) => {
      matrix[rowIndex][cellIndex] = "";
    });
  }
}
