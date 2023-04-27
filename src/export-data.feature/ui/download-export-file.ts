import { downloadFile } from 'src/utils/ui/download-file';

const exportFileName = 'taskmap-export.json' as const;

export function downloadExportFile(file: Blob) {
	downloadFile(exportFileName, file);
}
