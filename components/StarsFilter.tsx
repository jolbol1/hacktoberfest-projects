import { useRouter } from 'next/router';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { GoX } from 'react-icons/go';

interface FormValues {
  startStars: number;
  endStars: number | string;
}

export default function StarsFilter() {
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ startStars, endStars }) => {
    let query;
    if (endStars < startStars) {
      reset({ startStars, endStars: '' });
      query = { startStars };
      const { endStars, ...rest } = router.query;
      router.push({ query: { ...rest, ...query } });
    } else {
      query = {
        startStars,
        endStars
      };
      router.push({ query: { ...router.query, ...query } });
    }
  };

  return (
    <form
      className="w-full m-2 mx-auto mb-4 lg:w-2/4 form-control"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2">
        <Controller
          name="startStars"
          render={({ field }) => (
            <input
              type="number"
              className="w-full pr-16 input input-primary input-bordered border-primary"
              {...field}
              onChange={e => {
                field.onChange(parseInt(e.target.value, 10));
              }}
            />
          )}
          control={control}
        />
        <Controller
          name="endStars"
          render={({ field }) => (
            <input
              type="number"
              className="w-full pr-16 input input-primary input-bordered border-primary"
              {...field}
              onChange={e => {
                field.onChange(parseInt(e.target.value, 10));
              }}
            />
          )}
          control={control}
        />

        <button className="rounded-l-none btn btn-ghost" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
