import dynamic from "next/dynamic";

// app/loading.tsx
const Loading = () => {
  return (
    <div className="loading-container">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default dynamic(()=>Promise.resolve(Loading),{ssr:false});
