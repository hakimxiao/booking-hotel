import HeaderSection from "@/components/HeaderSection";
import Main from "@/components/Main";
import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Roooms & Rates",
  description: "Choose your best room today",
};

const RoomPage = () => {
  return (
    <div>
      <HeaderSection
        title="Rooms & Rates"
        subTitle="Lorem ipsum dolor sit amet."
      />
      <div className="mt-10 px-4">
        <Suspense fallback={<p>Loading...</p>}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;
