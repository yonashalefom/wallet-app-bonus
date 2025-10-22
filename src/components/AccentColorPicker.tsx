import React from 'react';
import { useTheme, type AccentColor } from '../hooks/useTheme';

interface AccentColorOptionProps {
  color: AccentColor;
  colorValue: string;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

const AccentColorOption: React.FC<AccentColorOptionProps> = ({
  color,
  colorValue,
  label,
  isSelected,
  onSelect
}) => {
  return (
    <button
      onClick={onSelect}
      className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
        isSelected 
          ? 'border-primary bg-primary/5' 
          : 'border-border bg-card hover:border-primary/50'
      }`}
      aria-label={`Select ${label} accent color`}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: colorValue }}
        />
        <span className="text-sm font-medium text-card-foreground">{label}</span>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
        </div>
      )}
    </button>
  );
};

export const AccentColorPicker: React.FC = () => {
  const { accent, changeAccent } = useTheme();

  const accentColors = [
    { color: 'theme-blue' as AccentColor, colorValue: '#3B82F6', label: 'Blue' },
    { color: 'theme-green' as AccentColor, colorValue: '#16A34A', label: 'Green' },
    { color: 'theme-purple' as AccentColor, colorValue: '#9333EA', label: 'Purple' },
    { color: 'theme-orange' as AccentColor, colorValue: '#EA580C', label: 'Orange' },
    { color: 'theme-pink' as AccentColor, colorValue: '#DB2777', label: 'Pink' },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-card-foreground">Accent Color</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {accentColors.map(({ color, colorValue, label }) => (
          <AccentColorOption
            key={color}
            color={color}
            colorValue={colorValue}
            label={label}
            isSelected={accent === color}
            onSelect={() => changeAccent(color)}
          />
        ))}
      </div>
    </div>
  );
};
