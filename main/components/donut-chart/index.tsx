import React, { createContext, useEffect, useState,useContext } from 'react';

export type Item = {
  className?: string;
  isEmpty?: boolean;
  label: string;
  value: number;
};
export type ItemWithRenderProps = Item & {
  angle: number;
  classNames: string;
  clickHandlers?: {
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  fill: string;
  index: number;
  opacity: number;
  stroke: string;
};
export type Colors = string[];
export type Props = {
  className?: string;
  clickToggle?: boolean;
  colorFunction?: (colors: Colors, index: number) => string;
  colors?: Colors;
  data: Item[];
  emptyColor?: string;
  emptyOffset?: number;
  formatValues?: (value: number, total: number) => string;
  height?: number;
  interactive?: boolean;
  innerRadius?: number;
  legend?: boolean;
  onClick?: (item: Item, toggled: boolean) => void;
  onMouseEnter?: (item: Item) => void;
  onMouseLeave?: (item: Item) => void;
  outerRadius?: number;
  selectedOffset?: number;
  strokeColor?: string;
  toggledOffset?: number;
  width?: number;
  totalNumber?: number
};
export type Context = Pick<
  Required<Props>,
  | 'className'
  | 'emptyOffset'
  | 'innerRadius'
  | 'outerRadius'
  | 'selectedOffset'
  | 'toggledOffset'
  | 'width'
> & {
  graphWidth: number;
  selected: Item | null;
  toggleSelect: boolean;
  total: number;
};

export const DonutChartContext = createContext<Context>(undefined!);

const DonutChart: React.FC<Props> = ({
  className = 'donutchart',
  clickToggle = true,
  colorFunction = (colors, index) => colors[index % colors.length],
  colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ],
  data = [
    {
      className: '',
      label: '',
      value: 100,
      isEmpty: true,
    },
  ],
  emptyColor = '#e0e0e0',
  emptyOffset = 0.08,
  // formatValues = (value, total) =>
  //   Number.isNaN(value / total)
  //     ? '--'
  //     : `${((value / total) * 100).toFixed(2)}%`,
  height = 500,
  interactive = true,
  innerRadius = 0.7,
  legend = true,
  // onMouseEnter = (item) => item,
  // onMouseLeave = (item) => item,
  onClick = (item, toggled) => (toggled ? item : null),
  outerRadius = 0.9,
  selectedOffset = 0.03,
  strokeColor = '#212121',
  toggledOffset = 0.04,
  width = 750,
  // totalNumber,
}) => {
  const [selected, setSelected] = useState(interactive ? data[0] : null);
  const [toggleSelect, setToggleSelect] = useState(false);

  useEffect(() => {
    if (interactive) {
      setSelected(null);
      setToggleSelect(false);
    }
  }, [interactive, data]);

  const graphWidth = width;
  const total = data.reduce((sum, { value }) => sum + value, 0);
  const { dataWithRenderProps } = data.reduce(
    ({ angle, dataWithRenderProps }, item, index) => {
      const { className, isEmpty, label, value } = item;
      const isSelected = selected?.label === label;
      const isToggled = isSelected && toggleSelect;

      return {
        angle: angle + (value / total) * 360,
        dataWithRenderProps: [
          ...dataWithRenderProps,
          {
            angle,
            index,
            ...item,
            classNames: `${className ?? ''} ${isEmpty ? 'empty' : ''} ${isSelected ? 'selected' : ''
              } ${isToggled ? 'toggled' : ''}`.trim(),
            fill: isEmpty ? emptyColor : colorFunction(colors, index),
            opacity: isSelected && !toggleSelect ? 0.5 : 1,
            stroke: isEmpty ? emptyColor : strokeColor,
            clickHandlers: interactive
              ? {
                onClick: () => {
                  if (selected?.label === label) {
                    const toggle = clickToggle ? !toggleSelect : false;
                    // setSelected(item);
                    // setToggleSelect(toggle);
                    onClick(item, toggle);
                  }
                },
                onMouseEnter: () => {
                  if (!toggleSelect) {
                    // setSelected(item);
                    // onMouseEnter(item);
                  }
                },

                onMouseLeave: () => {
                  if (!toggleSelect) {
                    // onMouseLeave(item);
                  }
                },
              }
              : undefined,
          },
        ],
        total: total + value,
      };
    },
    { angle: 0, dataWithRenderProps: [] as ItemWithRenderProps[] }
  );

  return (
    <DonutChartContext.Provider
      value={{
        className,
        emptyOffset,
        graphWidth,
        innerRadius,
        outerRadius,
        selected,
        selectedOffset,
        toggledOffset,
        toggleSelect,
        total,
        width,
      }}
    >
      <svg
        className={className}
        style={{ height, width }}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g className={`${className}-arcs`}>
          {dataWithRenderProps.map((item) => (
            <ArcPath item={item} key={`arcpath${item.index}`} />
          ))}
        </g>
        <g className={`${className}-innertext`}>
          <text
            className={`${className}-innertext-label`}
            x={graphWidth / 2}
            y="60%"
            textAnchor="middle"
          >
            Total Requests
          </text>
          <text
            className={`${className}-innertext-value`}
            x={graphWidth / 2}
            y="90%"
            textAnchor="middle"
          >
            {total}
            {/* {formatValues(selected.value, total)} */}
          </text>
        </g>
      </svg>
      <div className='donutchart-legends'>
        {legend && (
          <span className={`${className}-legend`}> 
            {dataWithRenderProps.map((item) => (
              <LegendItem key={`legenditem${item.index}`} item={item} />
            ))}
          </span>
        )}
      </div>
    </DonutChartContext.Provider>
  );
};

export default DonutChart;


// Arc Path
export type Props2 = { item: ItemWithRenderProps };

function coordinates(
   half: number,
   radius: number,
   startAngle: number,
   endAngle: number
 ) {
   const startAngleDegrees = (Math.PI * startAngle) / 180;
   const endAngleDegrees = (Math.PI * endAngle) / 180;
 
   return {
     x1: half + half * radius * Math.cos(startAngleDegrees),
     y1: half + half * radius * Math.sin(startAngleDegrees),
     x2: half + half * radius * Math.cos(endAngleDegrees),
     y2: half + half * radius * Math.sin(endAngleDegrees),
   };
 }
 
 function arc(
   width: number,
   radius: number,
   largeArcFlag: string,
   x: number,
   y: number
 ) {
   const z = (width / 2) * radius;
 
   return `A${z}, ${z} 0 ${largeArcFlag} ${x}, ${y}`;
 }
 
 function path(
   activeAngle: number,
   startAngle: number,
   width: number,
   innerRadius: number,
   outerRadius: number
 ) {
   const endAngle = startAngle + activeAngle;
 
   const largeArcFlagOuter = activeAngle > 180 ? '1 1' : '0 1';
   const largeArcFlagInner = activeAngle > 180 ? '1 0' : '0 0';
   const half = width / 2;
   const outerCoords = coordinates(half, outerRadius, startAngle, endAngle);
   const innerCoords = coordinates(half, innerRadius, startAngle, endAngle);
 
   const outerArc = arc(
     width,
     outerRadius,
     largeArcFlagOuter,
     outerCoords.x2,
     outerCoords.y2
   );
   const innerArc = arc(
     width,
     innerRadius,
     largeArcFlagInner,
     innerCoords.x1,
     innerCoords.y1
   );
 
   return `M${outerCoords.x1},${outerCoords.y1}
   ${outerArc}
   L${innerCoords.x2},${innerCoords.y2}
   ${innerArc} z`;
 }
 
 const ArcPath: React.FC<Props2> = ({ item }) => {
   const {
     className,
     emptyOffset,
     graphWidth,
     innerRadius,
     outerRadius,
     selected,
     selectedOffset,
     toggledOffset,
     toggleSelect,
     total,
   } = useContext(DonutChartContext);
   const {
     angle,
     classNames,
     clickHandlers,
     index,
     isEmpty,
     label,
     value,
     ...restItemRenderrops
   } = item;
   const activeAngle =
     Number.isNaN(value / total) || total / value === 1
       ? 359.99
       : (value / total) * 360;
   let [inner, outer] = [innerRadius, outerRadius];
 
   if (isEmpty) {
     inner += emptyOffset;
     outer -= emptyOffset;
   } else if (selected?.label === label) {
     if (toggleSelect) {
       inner -= toggledOffset;
       outer += toggledOffset;
     } else {
       outer += selectedOffset;
     }
   }
 
   return (
     <path
       {...{
         ...clickHandlers,
         ...restItemRenderrops,
       }}
       className={`${className}-arcs-path ${classNames}`}
       d={path(activeAngle, angle, graphWidth, inner, outer)}
     ></path>
   );
 };
 

//  Legend item

const LegendItem: React.FC<Props2> = ({ item }) => {
   const { className, width } = useContext(DonutChartContext);
   const {
     classNames,
     clickHandlers,
     index,
     isEmpty,
     label,
     value,
     ...restItemRenderProps
   } = item;
   const classSuffix = 'legend-item';
   const legendWidth = width;
   const sqUnit = legendWidth / 50;
   // const yOffset = 1.5;
 
   console.log(restItemRenderProps)
   return (
     <span
       {...clickHandlers}
       className={`${className}-${classSuffix} ${classNames}`}
       style={{
         display: 'flex',
         alignItems: 'center',
         gap: '0.5em'
       }}
     >
       <span style={{ display: 'inline-block', backgroundColor: `${restItemRenderProps.fill}`, width: `${sqUnit}px`, height: `${sqUnit}px` }}></span>
       {`${label} `}
     </span>
   );
 };