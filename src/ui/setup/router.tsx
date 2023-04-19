import { createBrowserRouter, redirect } from 'react-router-dom';
import { MainBoardPage } from 'src/task/main-board.feature/ui/MainBoardPage';
import { TaskPage } from '../../task/view-task.feature/ui/TaskPage';
import { AppLayout } from '../AppLayout';
import { NotFoundPage } from '../NotFoundPage';
import { uiDependencies } from './ui-dependencies';

export const TaskmapRoute = {
	MainBoard: '/main-board',
	Task: {
		URLTemplate: `/task/:taskID`,
		URL: (taskID: string) => `/task/${taskID}`,
	},
	Settings: '/settings',
	SettingsExport: '/settings/export',
	SettingsImport: '/settings/import',
} as const;

export const router = createBrowserRouter([
	{
		path: '/',
		ErrorBoundary: NotFoundPage,
		loader: () => redirect(TaskmapRoute.MainBoard),
	},
	{
		path: TaskmapRoute.Settings,
		ErrorBoundary: NotFoundPage,
		loader: () => redirect(TaskmapRoute.SettingsExport),
	},
	{
		element: <AppLayout />,
		ErrorBoundary: NotFoundPage,

		children: [
			{
				path: TaskmapRoute.MainBoard,
				loader: () => {
					uiDependencies.viewMainBoardController.run();
					return uiDependencies.mainBoardState.value.extract()!;
				},
				Component: MainBoardPage,
			},
			{
				path: TaskmapRoute.Task.URLTemplate,
				loader: ({ params }) => {
					uiDependencies.viewTaskController.run(params.taskID!);
					return uiDependencies.viewedTaskState.value.extract()!;
				},
				Component: TaskPage,
			},
			{
				path: TaskmapRoute.SettingsExport,
				element: <div>Export</div>,
			},
			{
				path: TaskmapRoute.SettingsImport,
				element: <div>Import</div>,
			},
		],
	},
]);
