import * as d3 from 'd3';

export type D3ColorType = { r: number; g: number; b: number; opacity?: number };

export type QuadrantColorsType = {
  colors: D3ColorType[] | null;
  initialOpacity?: number;
  clumpingOpacity?: number;
};

export type RadarConfParamType = Partial<RadarOptionsType>;
export type OrdersParamType = { horizons?: string[]; quadrants?: string[] };
export type ColorsParamType = {
  quadrants?: QuadrantColorsType;
};

export type QuadsType = {
  quadrant: number;
  horizon: number;
  label: QuadrantKey;
};

export type PriorityType = {
  horizon: string[];
  quadrant: string[];
};

export type KeysObject = {
  techKey: TechKey;
  titleKey: TitleKey;
  horizonKey: HorizonKey;
  quadrantKey: QuadrantKey;
  useCaseKey: UseCaseKey;
  disasterTypeKey: DisasterTypeKey;
};

export type RgbOut = string | number | boolean | null;

export type BaseCSVType = { [x: string]: string };

export type HorizonKey = string;
export type QuadrantKey = string;
export type TechKey = string;
export type UseCaseKey = string;
export type DisasterTypeKey = string;
export type TitleKey = string;

type IndexedWith<T extends string, A> = {
  [key in T]: A;
};

export type RawBlipType = IndexedWith<TitleKey, string> &
  IndexedWith<TechKey, string[]> &
  IndexedWith<QuadrantKey, string> &
  IndexedWith<HorizonKey, string> &
  IndexedWith<UseCaseKey, string> &
  IndexedWith<DisasterTypeKey, string>;

export type BlipType = {
  id: string;
  quadrantIndex: number;
  x: number;
  y: number;
} & RawBlipType;

export type PriorityOrderType = { [key: string]: number };

export type MappingType<T> = (
  value: BaseCSVType,
  index: number,
  array: BaseCSVType[]
) => T;

export interface SelectableItem {
  uuid: string;
  name: string;
}

export interface TechItemType {
  uuid: string;
  color: string;
  type: string;
  slug: string;
  description: string[];
}

export interface RadarOptionsType {
  width: number;
  height: number;
  quadrants: QuadrantKey[];
  horizons: HorizonKey[];
  radarOptions: {
    horizonShiftRadius: number;
    radiusPadding: number;
    circlePadding: number;
  };
  tech: TechItemType[];
}

export interface QuadOrOrizonOptsType {
  title: string;
  description?: string;
  textAnchor?: string;
}

export type ReactLabelComp = React.FC<{
  label?: string;
  className?: string;
  textAnchor?: string | undefined;
  onMouseMove?: React.MouseEventHandler<SVGGElement> | undefined;
  onMouseOut?: React.MouseEventHandler<SVGGElement> | undefined;
  onMouseEnter?: React.MouseEventHandler<SVGGElement> | undefined;
  onMouseUp?: React.MouseEventHandler<SVGGElement> | undefined;
}>;

export interface RadarQuadrantProps {
  w?: number;
  h?: number;
}

export type D3SvgEl = d3.Selection<SVGSVGElement, unknown, null, undefined>;
export type D3SvgGEL = d3.Selection<SVGGElement, unknown, null, undefined>;

export type RadarDataBlipsAndLogic = {
  radarData: RadarOptionsType;
  blips: BlipType[];
  logic: {
    setSelectedItem: (itemId: BlipType | null) => void;
    setHoveredItem: (itemId: BlipType | null) => void;
    setSelectedQuadrant: (quadrantKey: QuadrantKey | null) => void;
  };
};
