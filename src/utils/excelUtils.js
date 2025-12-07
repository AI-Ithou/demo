import * as XLSX from 'xlsx';

// 读取 Excel 文件为 JSON
export const readExcelFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
            resolve(jsonData);
        } catch (error) {
            reject(error);
        }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
});

// 导出多 Sheet Excel 文件
export const exportExcelFile = (sheets, fileName) => {
    const workbook = XLSX.utils.book_new();
    sheets.forEach(({ name, data }) => {
        const sheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, sheet, name);
    });
    XLSX.writeFile(workbook, fileName);
};

// 构造模板数据
export const buildTemplateRow = (headers) => headers.reduce((acc, key) => {
    acc[key] = '';
    return acc;
}, {});

// 生成带日期后缀的文件名
export const buildExcelFileName = (prefix) => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${prefix}-${date.getFullYear()}${month}${day}.xlsx`;
};
