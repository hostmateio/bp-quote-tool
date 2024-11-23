import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Download, Plus, X } from 'lucide-react';

const QuoteTool = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    userType: '',
    deploymentType: 'cloud',
    selectedProducts: [],
    billingCycle: 'monthly'
  });

  // Group products by category
  const productCategories = {
    'Clinical': [
      { id: 'gp-premier', name: 'GP - Bp Premier' },
      { id: 'specialist', name: 'Specialist - Bp VIPnet' },
      { id: 'allied', name: 'Allied - Bp Allied' },
      { id: 'bp-omni', name: 'Bp Omni' }
    ],
    'Mobile': [
      { id: 'mobile', name: 'Best Practice Mobile' }
    ],
    'Communication': [
      { id: 'comms', name: 'Bp Comms' },
      { id: 'sms', name: 'Bp SMS' }
    ],
    'Patient Engagement': [
      { id: 'health-app', name: 'Best Health App' },
      { id: 'health-booking', name: 'Best Health Booking' }
    ]
  };

  const calculatePrice = (userCount, cycle = 'monthly') => {
    const monthlyPrice = userCount * 90;
    if (cycle === 'annual') {
      return monthlyPrice * 12 * 0.85; // 15% discount for annual
    }
    return monthlyPrice;
  };

  // Progress Steps Component
  const ProgressSteps = () => (
    <div className="max-w-2xl mx-auto flex items-center justify-between mb-12 pt-8">
      {[
        { num: 1, label: 'Use Case' },
        { num: 2, label: 'Products' },
        { num: 3, label: 'Details' }
      ].map((s, i) => (
        <React.Fragment key={s.num}>
          <div className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
                ${step === s.num ? 'bg-teal-500 text-white' : 
                  step > s.num ? 'bg-teal-100 text-teal-500' : 
                  'bg-gray-100 text-gray-400'}`}
            >
              {step > s.num ? '✓' : s.num}
            </div>
            <span className={`text-sm ${step === s.num ? 'text-teal-500' : 'text-gray-500'}`}>
              {s.label}
            </span>
          </div>
          {i < 2 && (
            <div className={`flex-1 h-px mx-4 ${step > s.num + 1 ? 'bg-teal-500' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step 1: Use Case Selection
  const UseCaseStep = () => (
    <div className="max-w-2xl mx-auto px-6">
      <h1 className="text-2xl font-semibold mb-8">Select your use case</h1>
      <div className="space-y-4">
        {['General Practitioner', 'Specialist', 'Allied Health Professional'].map((type) => (
          <div
            key={type}
            onClick={() => {
              setSelections({ ...selections, userType: type });
              setStep(2);
            }}
            className={`p-4 rounded-lg border flex items-center cursor-pointer transition-colors
              ${selections.userType === type 
                ? 'border-teal-500 bg-teal-50' 
                : 'border-gray-200 hover:border-teal-500'}`}
          >
            <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
              {selections.userType === type && <div className="w-3 h-3 rounded-full bg-teal-500" />}
            </div>
            <span className="flex-grow">{type}</span>
            <ChevronRight className={`w-5 h-5 ${selections.userType === type ? 'text-teal-500' : 'text-gray-300'}`} />
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: Product Selection
  const ProductStep = () => (
    <div className="max-w-2xl mx-auto px-6">
      <div className="flex items-center mb-8">
        <button onClick={() => setStep(1)} className="mr-4">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold">Select your products</h1>
      </div>

      <div className="flex justify-end mb-6">
        <div className="inline-flex bg-gray-100 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded-md text-sm transition-colors
              ${selections.deploymentType === 'cloud' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            onClick={() => setSelections(s => ({ ...s, deploymentType: 'cloud' }))}
          >
            Cloud
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm transition-colors
              ${selections.deploymentType === 'selfHost' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            onClick={() => setSelections(s => ({ ...s, deploymentType: 'selfHost' }))}
          >
            Self Host
          </button>
        </div>
      </div>

      {Object.entries(productCategories).map(([category, products]) => (
        <div key={category} className="mb-8">
          <h2 className="text-sm text-gray-500 font-medium mb-3">{category}</h2>
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelections(s => ({
                    ...s,
                    selectedProducts: [{
                      ...product,
                      licenseType: 'Full Time',
                      userCount: 14
                    }]
                  }));
                  setStep(3);
                }}
                className="p-4 rounded-lg border border-gray-200 flex items-center cursor-pointer hover:border-teal-500"
              >
                <div className="w-5 h-5 rounded-full border mr-3 flex items-center justify-center">
                  {selections.selectedProducts.some(p => p.id === product.id) && (
                    <div className="w-3 h-3 rounded-full bg-teal-500" />
                  )}
                </div>
                <span className="flex-grow">{product.name}</span>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // Step 3: Configuration
  const ConfigureStep = () => (
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex items-center mb-8">
        <button onClick={() => setStep(2)} className="mr-4">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold">Configure your products</h1>
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          {selections.selectedProducts.map((product, index) => (
            <div key={index} className="bg-white border rounded-lg p-6 mb-6">
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                </div>
                <button 
                  onClick={() => {
                    const newProducts = selections.selectedProducts.filter((_, i) => i !== index);
                    setSelections(s => ({ ...s, selectedProducts: newProducts }));
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">License type</label>
                  <select 
                    value={product.licenseType}
                    onChange={(e) => {
                      const newProducts = [...selections.selectedProducts];
                      newProducts[index] = { ...product, licenseType: e.target.value };
                      setSelections(s => ({ ...s, selectedProducts: newProducts }));
                    }}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>AHP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Number of users</label>
                  <input 
                    type="number"
                    value={product.userCount}
                    onChange={(e) => {
                      const newProducts = [...selections.selectedProducts];
                      newProducts[index] = { ...product, userCount: parseInt(e.target.value) || 0 };
                      setSelections(s => ({ ...s, selectedProducts: newProducts }));
                    }}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <button className="inline-flex items-center px-4 py-2 border rounded-lg text-gray-600">
                <Plus className="w-4 h-4 mr-2" />
                Add a Feature
              </button>

              <div className="mt-6 pt-6 border-t">
                <div className="text-2xl font-medium">
                  ${calculatePrice(product.userCount, selections.billingCycle).toFixed(2)} 
                  {selections.billingCycle === 'monthly' ? ' monthly' : ' annually'}
                </div>
                <div className="text-gray-500">
                  ${selections.billingCycle === 'monthly' ? '90' : '76.50'} per user
                  {selections.billingCycle === 'annual' && ' (billed annually)'}
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setStep(2)}
            className="inline-flex items-center px-4 py-2 border rounded-lg text-gray-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Product
          </button>
        </div>

        <div className="w-96">
          <div className="border rounded-lg shadow-sm">
            <div className="bg-teal-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-medium">Estimate</h2>
            </div>
            <div className="p-4">
              <div className="flex justify-end mb-6">
                <div className="inline-flex bg-gray-100 p-1 rounded-lg">
                  <button 
                    className={`px-3 py-1 text-sm rounded-md transition-colors
                      ${selections.billingCycle === 'monthly' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                    onClick={() => setSelections(s => ({ ...s, billingCycle: 'monthly' }))}
                  >
                    Monthly
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-md transition-colors
                      ${selections.billingCycle === 'annual' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                    onClick={() => setSelections(s => ({ ...s, billingCycle: 'annual' }))}
                  >
                    Annually
                  </button>
                </div>
              </div>

              {selections.selectedProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center mb-4">
                  <span>{product.name}</span>
                  <span>
                    ${calculatePrice(product.userCount, selections.billingCycle).toFixed(2)}
                    {selections.billingCycle === 'monthly' ? ' monthly' : ' annually'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="bg-teal-500 text-white p-4">
              <div className="text-2xl font-medium mb-1">
                ${selections.selectedProducts.reduce((sum, product) => 
                  sum + calculatePrice(product.userCount, selections.billingCycle), 0).toFixed(2)} AU
              </div>
              <div className="text-sm mb-6">
                Estimated {selections.billingCycle === 'monthly' ? 'monthly' : 'annual'} cost excluding GST
              </div>
              <div className="space-y-2">
                <button className="w-full py-2 bg-white text-teal-500 rounded hover:bg-gray-50">
                  Contact sales
                </button>
                <button className="w-full py-2 bg-white text-teal-500 rounded hover:bg-gray-50 inline-flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressSteps />
      <div className="bg-white min-h-screen pb-12">
        {step === 1 && <UseCaseStep />}
        {step === 2 && <ProductStep />}
        {step === 3 && <ConfigureStep />}
      </div>
    </div>
  );
};

export default QuoteTool;