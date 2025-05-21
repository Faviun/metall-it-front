import { Typography } from "@material-tailwind/react";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Typography
        as="h2"
        variant="h2"
        className="text-center mb-6"
        placeholder={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Добро пожаловать в маркетплейс металлопроката
      </Typography>
      <Typography
        as="p"
        variant="lead"
        className="text-center text-gray-700"
        placeholder={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Здесь вы можете найти широкий ассортимент чёрного и цветного металла по
        выгодным ценам. branch_2
      </Typography>
    </div>
  );
}
