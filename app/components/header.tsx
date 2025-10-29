import Image from "next/image";
import logo from "@/app/assets/images/logo.svg";
import selectIcon from "@/app/assets/images/icon-checkmark.svg";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import iconConfig from "@/app/assets/images/icon-units.svg";

export function Header() {
  return (
    <header className="flex justify-between h-20 items-center px-4">
      <Image src={logo} alt="Logo" />
      <Select>
        <SelectTrigger className="w-[110px] bg-[hsl(243,23%,30%)] text-neutral-200 border-none  rounded-md cursor-pointer">
          <Image src={iconConfig} alt="Units icon" width={16} height={16} />
          <SelectValue placeholder="Units" className="placeholder:text-white" />
        </SelectTrigger>
        <SelectContent className="bg-[hsl(243,23%,24%)] text-neutral-200">
          <SelectGroup>
            <SelectLabel className="text-neutral-400 font-semibold text-sm">
              Temperature
            </SelectLabel>
            <SelectItem value="celsius" className="bg-[hsl(243,23%,35%)]">
              Celsius (°C)
              <Image src={selectIcon} alt="" width={16} height={16} />
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel className="text-neutral-400 font-semibold text-sm">
              Wind Speed
            </SelectLabel>
            <SelectItem value="km" className="bg-[hsl(243,23%,35%)]">
              km/h
              <Image src={selectIcon} alt="" width={16} height={16} />
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel className="text-neutral-400 font-semibold text-sm">
              Precipitation
            </SelectLabel>
            <SelectItem value="millimeters" className="bg-[hsl(243,23%,35%)]">
              Millimeters (mm)
              <Image src={selectIcon} alt="" width={16} height={16} />
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </header>
  );
}
