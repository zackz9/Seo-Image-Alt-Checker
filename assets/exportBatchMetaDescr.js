
    
document.getElementById('exportCSV').addEventListener('click', () => {
    const history = JSON.parse(localStorage.getItem('metaDescriptions') || '[]');
    if (!history.length) return;
  
    let csv = "URL,Title,Title Words,Title Characters,Title Pixels,Description,Desc Words,Desc Characters,Desc Pixels\n";
    const blocks = [...document.querySelectorAll('.preview-box')];
  
      for (const { url } of history) {
        const block = blocks.find(b => b.innerHTML.includes(url));
        const title = block?.querySelector('.title-input')?.value || '';
        const desc = block?.querySelector('.desc-input')?.value || '';
        const titleWords = title.split(/\s+/).filter(Boolean).length;
        const titleChars = title.length;
        const titlePx = title.length * 7;
        const descWords = desc.split(/\s+/).filter(Boolean).length;
        const descChars = desc.length;
        const descPx = desc.length * 7;
        csv += `"${url}","${title.replace(/"/g, '""')}",${titleWords},${titleChars},${titlePx},"${desc.replace(/"/g, '""')}",${descWords},${descChars},${descPx}\n`;
      }
  
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'meta_descriptions.csv';
      link.click();
    });