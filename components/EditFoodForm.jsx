import EditFoodForm from './EditFoodForm';

export default function EditFoodForm (){
    return (<form className="flex flex-col gap-4 mt-10">
    <input className="border border-slate-500 px-9 py-2" type="text" placeholder="Food Name"/>  

    <input className="border border-slate-500 px-9 py-2" type="text" placeholder="Food Description"/> 

      <button className="bg-blue-600 font-arial text-white py-3 px-6 w-fit">Update Food </button>
  </form>
    );
}