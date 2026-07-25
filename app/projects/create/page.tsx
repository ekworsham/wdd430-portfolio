'use client';

import { useActionState } from 'react';
import { createProject, type State } from '@/app/lib/actions';

const initialState: State = {
  message: null,
  errors: {},
};

export default function Page() {
  const [state, formAction, isPending] = 
  useActionState(createProject, initialState);

return (
    <form action={formAction}>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        aria-describedby="title-error"
        required
      />

      <div
        id="title-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.title?.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        aria-describedby="description-error"
        required
      />

      <div
        id="description-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.description?.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>

      <label htmlFor="technologies">Technologies</label>
      <input
        id="technologies"
        name="technologies"
        aria-describedby="technologies-error"
        required
      />

      <div
        id="technologies-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.technologies?.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>

      <label htmlFor="yearCompleted">Year Completed</label>
      <input
        id="yearCompleted"
        name="yearCompleted"
        type="number"
        min="2000"
        max="2099"
        aria-describedby="yearCompleted-error"
        required
      />

      <div
        id="yearCompleted-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.yearCompleted?.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>



      <button type="submit" disabled={isPending}>
        Save Project
      </button>

    </form>
  );
}






























// 'use client';

// import { useActionState } from 'react';
// import { createProject, type State } from '@/app/lib/actions';

// const initialState: State = { message: null, errors: {} };

// export default function CreateProjectForm() {
//   const [state, formAction, isPending] = useActionState(createProject, initialState);
  
// export default function Page() {
//   return (
//     <form action={createProject}>
//       <label htmlFor="title">Title</label>
//       <input id="title" name="title" required />

//       <label htmlFor="description">Description</label>
//       <textarea id="description" name="description" required />

//       <label htmlFor="technologies">Technologies (comma-separated)</label>
//       <input id="technologies" name="technologies" required />

//       <label htmlFor="yearCompleted">Year Completed</label>
//       <input
//         id="yearCompleted"
//         name="yearCompleted"
//         type="number"
//         min="2000"
//         max="2099"
//         className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
//         aria-describedby="yearCompleted-error"
//         required
//       />
//       <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
//         {state.errors?.yearCompleted?.map((error) => (
//           <p key={error} className="mt-1 text-sm text-red-600">
//             {error}
//           </p>
//         ))}
//       </div>

//       <button type="submit">Save Project</button>
//     </form>
//   );
// }