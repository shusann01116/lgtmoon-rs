import { ImageForm } from "@/components/ImageForm";
import WasmProvider from "@/providers/WasmProvider";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <WasmProvider>
          <ImageForm />
        </WasmProvider>
      </main>
    </div>
  );
}
