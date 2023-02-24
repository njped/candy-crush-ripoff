function renderBoard() {

    const mainElement = document.querySelector('#main');

    mainElement.innerHTML = getHtmlForRenderBoard();


    function getHtmlForRenderBoard() {
        return `
            <table>
                ${getTbodyContent()}
            </table>
        
        `
    }
    
    function getTbodyContent() {
        return `
            <tbody>
                ${
                    matrix.reduce((html, row, rowIndex) => html + getRowHtml({ row, rowIndex }), '')
                }
            </tbody>
        `
    }
    
    function getRowHtml({row, rowIndex }) {
        return `
            <tr>
                ${
                    row.reduce((html, colorValue, cellIndex) => html + getCellHtml({ rowIndex, cellIndex, colorValue }), '') 
                }
            <tr>
        `
    }
    
    function getCellHtml({ rowIndex, cellIndex, colorValue }) {
    
        return `
            <td data-rowIndex=${rowIndex} data-cellIndex=${cellIndex} class=${colorValue}>
            </td>
        `
    }
}

