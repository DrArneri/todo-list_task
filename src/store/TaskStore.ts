import {create} from 'zustand'
import type { Task } from '../entity/Task/model/model'
import { persist } from 'zustand/middleware'

export type TaskStore = {
    tasks: Task[];
    addTask: (task: Task) => void;
    deleteTask: (id: number) => void;
    deleteAllTasks: () => void;
    toggleComplete: (id:number) => void;
}

export const useTask = create<TaskStore>()(
    persist(
        (set) => (
             {
                tasks: [],
                addTask: (task:Task) => set((state) => ({
                    tasks: [...state.tasks, task]
                })),
                deleteTask: (id: number) => set((state) => ({
                    tasks: state.tasks.filter(t => t.id !== id)
                })),
                deleteAllTasks: () => set(() => ({
                    tasks: []
                })),

                toggleComplete: (id:number) => set((state) => ({
                    tasks: state.tasks.map(t => 
                        t.id === id
                        ? {...t, isDone: !t.isDone}
                        : t
                    )
                })),
            }
        ),
        {name: 'task-storage'}
    )
  
)