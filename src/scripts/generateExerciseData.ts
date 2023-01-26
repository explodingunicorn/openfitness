import { supabase } from "../utils/supabaseClient";
import exerciseData from "../data/exercises.json";
import categoryData from "../data/categories.json";
import exerciseBaseData from "../data/exercise-base-data.json";

const main = async () => {
  console.log("Updating exercise data");

  const mappedCategoryData = categoryData.map((cat) => {
    return {
      id: cat.pk,
      name: cat.fields.name,
    };
  });

  console.log("Deleting exercises");
  await supabase.from("exercises").delete().neq("id", 0);

  console.log("Deleting categories");
  const { error: categoryDeleteError } = await supabase.from("exercise_categories").delete().neq("id", 0);
  if (categoryDeleteError) console.log("Error - ", categoryDeleteError?.message);

  console.log(
    `Inserting new category data. ${mappedCategoryData.length} entries`
  );
  const { error: categoryError } = await supabase
    .from("exercise_categories")
    .insert(mappedCategoryData);

  if (categoryError) console.log(categoryError);

  const englishExerciseData = exerciseData.filter(
    (data) => data.fields.language === 2
  );

  const baseDataMap = exerciseBaseData.reduce((prev, curr) => {
    prev[curr.pk] = curr.fields;
    return prev;
  }, {} as { [key: number]: (typeof exerciseBaseData)[0]["fields"] });

  const mergedData: { name: string; description: string; category_id: number }[] =
    [];

  englishExerciseData.forEach((exercise) => {
    if (exercise.fields.exercise_base) {
      const base = baseDataMap[exercise.fields.exercise_base];
      if (base && base.category) {
        mergedData.push({
          name: exercise.fields.name,
          description: exercise.fields.description.replace( /(<([^>]+)>)/ig, ''),
          category_id: base.category,
        });
      }
    }
  });

  const nameDict: { [key: string]: boolean } = {};
  console.log(`Inserting new exercise data. ${mergedData.length} entries`);
  const { error: exerciseError } = await supabase.from("exercises").insert(
    mergedData.reduce((prev, curr) => {
      if (!nameDict[curr.name]) {
        prev.push(curr);
      }
      nameDict[curr.name] = true;
      return prev;
    }, [] as (typeof mergedData)[0][])
  );
  if (exerciseError) console.log(exerciseError);

  console.log("Finished!");
};

main();
