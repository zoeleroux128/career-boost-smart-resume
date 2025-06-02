
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Palette } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface TemplateSelectorProps {
  data: ResumeData;
  onUpdate: (section: string, data: any) => void;
}

const TemplateSelector = ({ data, onUpdate }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'creative'>(data.template);
  const [customization, setCustomization] = useState(data.customization);

  const templates = [
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Clean, minimalist design with subtle colors',
      preview: 'bg-gradient-to-br from-blue-50 to-white'
    },
    {
      id: 'classic' as const,
      name: 'Classic',
      description: 'Traditional format preferred by conservative industries',
      preview: 'bg-gradient-to-br from-gray-50 to-white'
    },
    {
      id: 'creative' as const,
      name: 'Creative',
      description: 'Bold design for creative professionals',
      preview: 'bg-gradient-to-br from-purple-50 to-pink-50'
    }
  ];

  const colors = [
    { name: 'Blue', value: '#2563eb' },
    { name: 'Green', value: '#059669' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Teal', value: '#0d9488' }
  ];

  const fonts = [
    { name: 'Inter', value: 'Inter' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Open Sans', value: 'Open Sans' },
    { name: 'Lato', value: 'Lato' }
  ];

  const handleTemplateSelect = (templateId: 'modern' | 'classic' | 'creative') => {
    setSelectedTemplate(templateId);
    onUpdate('template', templateId);
  };

  const handleCustomizationChange = (field: string, value: any) => {
    const newCustomization = { ...customization, [field]: value };
    setCustomization(newCustomization);
    onUpdate('customization', newCustomization);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-5 w-5 mr-2 text-blue-500" />
            Choose Your Template
          </CardTitle>
          <CardDescription>
            Select a design that best fits your industry and personal style
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-4">
                  <div className={`h-32 rounded-lg mb-3 ${template.preview} border-2 border-gray-200 relative`}>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                    {/* Template preview placeholder */}
                    <div className="p-3 space-y-2">
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                      <div className="mt-3 space-y-1">
                        <div className="h-1 bg-gray-200 rounded w-full"></div>
                        <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customization Options</CardTitle>
          <CardDescription>
            Personalize your chosen template with colors and typography
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">Primary Color</Label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleCustomizationChange('primaryColor', color.value)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    customization.primaryColor === color.value
                      ? 'border-gray-400 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {customization.primaryColor === color.value && (
                    <Check className="h-4 w-4 text-white mx-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="font-select" className="text-base font-medium">Font Family</Label>
              <Select 
                value={customization.font} 
                onValueChange={(value) => handleCustomizationChange('font', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="spacing-select" className="text-base font-medium">Spacing</Label>
              <Select 
                value={customization.spacing} 
                onValueChange={(value: 'compact' | 'normal' | 'relaxed') => handleCustomizationChange('spacing', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="relaxed">Relaxed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateSelector;
