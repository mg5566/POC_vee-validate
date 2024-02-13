import DComponent from "./DComponent";

export default function CComponent({ number }: { number: number }) {
  return (
    <div>
      {number}
      <DComponent />
    </div>
  );
}
