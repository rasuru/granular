import { useSignal } from '@preact/signals-react';
import { TaskStatus } from '../entity/status';
import { useCurrentTaskController } from './hooks/use-task-controller';

export function TaskForm({ status }: { status: TaskStatus }) {
	const taskController = useCurrentTaskController();
	const showForm = useSignal(false);
	const text = useSignal('');

	if (!showForm.value) {
		return (
			<button
				className="w-full rounded py-1 px-4 text-left text-zinc-700 hover:bg-zinc-50"
				onClick={() => (showForm.value = !showForm.value)}
			>
				Add task
			</button>
		);
	}

	return (
		<div role="form" className="mt-4">
			<textarea
				value={text.value}
				onChange={(e) => (text.value = e.target.value)}
				onKeyDown={testSubmitFormTrigger}
				className="h-24 w-full resize-none rounded px-4 py-2"
				autoFocus
			/>
			<button
				onClick={submitForm}
				className="mt-2 rounded bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700"
			>
				Add task
			</button>
		</div>
	);

	function testSubmitFormTrigger(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === 'Enter') {
			e.preventDefault();
			submitForm();
		}
	}

	function submitForm() {
		taskController.addChildTask({ text: text.value, status });
		text.value = '';
		showForm.value = false;
	}
}
