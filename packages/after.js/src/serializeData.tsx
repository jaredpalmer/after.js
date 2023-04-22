import React from 'react';
import serialize from 'serialize-javascript';

interface SerializeData
  extends React.DetailedHTMLProps<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  > {
  name: string;
  data: any;
}

export const SerializeData: React.FC<SerializeData> = ({
  data,
  name,
  ...props
}) => {
  return (
    <script
      defer
      {...props}
      dangerouslySetInnerHTML={{
        __html: `window._${name.toUpperCase()}_ = ${serialize(data)}`,
      }}
    />
  );
};

export const getSerializedData = (name: string, remove = true): any => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const data = window[`_${name.toUpperCase()}_`];
  if (remove) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window[`_${name.toUpperCase()}_`];
  }
  return data;
};
