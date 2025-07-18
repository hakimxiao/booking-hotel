import HeaderSection from "@/components/HeaderSection";
import Main from "@/components/Main";
import { type Metadata } from "next";
import { Suspense } from "react";
import RoomSkeleton from "@/components/skeletons/RoomSkeleton";

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
        <Suspense fallback={<RoomSkeleton />}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;
