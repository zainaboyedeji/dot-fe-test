import { Fragment } from "react";
import Card from "./card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useScreenWidth from "@/hooks/useScreenWidth";

const CardSkeleton: React.FC<{ singleButton?: boolean }> = ({
  singleButton,
}) => {
  const screenWidth = useScreenWidth();
  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="bg-white p-4 rounded-lg shadow-md">
            <Skeleton height={200} className="mb-4 !rounded-lg" />

            <Skeleton
              width={screenWidth < 700 ? 150 : 250}
              height={25}
              className="!rounded-lg mb-2"
            />

            <Skeleton width={100} height={20} className="!rounded-lg mb-2" />

            <Skeleton width={80} height={30} className="!rounded-lg mb-4" />

            <Skeleton width="100%" height={40} className="!rounded-lg" />
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

export default CardSkeleton;
