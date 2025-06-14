
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Package, Clock, MapPin, User } from 'lucide-react';
import { useSupply } from '@/contexts/SupplyContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type DeliveryEvent = {
  id: string;
  date: Date;
  supplierName: string;
  supplierContact: string;
  itemName: string;
  quantity: number;
  unit: string;
  status: 'pending' | 'in-progress' | 'completed';
  leadTime: number;
  estimatedArrival: Date;
};

export const CalendarWidget: React.FC = () => {
  const [currentDate] = useState(new Date());
  const { transactions, suppliers, inventory } = useSupply();
  const [deliveries, setDeliveries] = useState<DeliveryEvent[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryEvent | null>(null);
  
  useEffect(() => {
    // Generate delivery events based on recent transactions and supplier data
    const generateDeliveryEvents = () => {
      const events: DeliveryEvent[] = [];
      
      // Get recent inbound transactions
      const recentInboundTransactions = transactions
        .filter(t => t.type === "inbound")
        .slice(0, 10); // Get last 10 transactions
      
      recentInboundTransactions.forEach((transaction, index) => {
        // Find the supplier for this transaction
        const supplier = suppliers.find(s => 
          s.productsSupplied.some(product => 
            product.toLowerCase().includes(transaction.itemName.toLowerCase())
          )
        );
        
        if (supplier) {
          // Calculate delivery dates based on supplier lead time
          const baseDate = new Date();
          const deliveryDate = new Date();
          deliveryDate.setDate(baseDate.getDate() + (index * 2) - 5); // Spread deliveries across dates
          
          const estimatedArrival = new Date();
          estimatedArrival.setDate(baseDate.getDate() + supplier.leadTime + (index * 2) - 5);
          
          // Get unit from inventory item
          const inventoryItem = inventory.find(item => item.id === transaction.itemId);
          const unit = inventoryItem?.unit || 'units';
          
          // Determine status based on date
          let status: 'pending' | 'in-progress' | 'completed';
          const today = new Date();
          const daysDiff = Math.floor((deliveryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysDiff < -2) {
            status = 'completed';
          } else if (daysDiff <= 0) {
            status = 'in-progress';
          } else {
            status = 'pending';
          }
          
          events.push({
            id: `${transaction.id}-${supplier.id}`,
            date: deliveryDate,
            supplierName: supplier.name,
            supplierContact: supplier.contact,
            itemName: transaction.itemName,
            quantity: transaction.quantity,
            unit: unit,
            status: status,
            leadTime: supplier.leadTime,
            estimatedArrival: estimatedArrival
          });
        }
      });
      
      // Add some upcoming deliveries based on suppliers
      suppliers.slice(0, 3).forEach((supplier, index) => {
        if (supplier.productsSupplied.length > 0) {
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + supplier.leadTime + (index * 3));
          
          // Pick a random product from supplier
          const randomProduct = supplier.productsSupplied[Math.floor(Math.random() * supplier.productsSupplied.length)];
          const randomQuantity = Math.floor(Math.random() * 100) + 20;
          
          events.push({
            id: `future-${supplier.id}-${index}`,
            date: futureDate,
            supplierName: supplier.name,
            supplierContact: supplier.contact,
            itemName: randomProduct,
            quantity: randomQuantity,
            unit: 'units',
            status: 'pending',
            leadTime: supplier.leadTime,
            estimatedArrival: futureDate
          });
        }
      });
      
      return events.sort((a, b) => a.date.getTime() - b.date.getTime());
    };
    
    setDeliveries(generateDeliveryEvents());
  }, [transactions, suppliers, inventory]);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const today = new Date().getDate();

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  // Find deliveries for the current month
  const currentMonthDeliveries = deliveries.filter(delivery => 
    delivery.date.getMonth() === currentDate.getMonth() && 
    delivery.date.getFullYear() === currentDate.getFullYear()
  );
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today && 
      currentDate.getMonth() === new Date().getMonth() && 
      currentDate.getFullYear() === new Date().getFullYear();
    
    // Check if there are deliveries on this day
    const dayDeliveries = currentMonthDeliveries.filter(d => d.date.getDate() === day);
    const hasDeliveries = dayDeliveries.length > 0;
    
    let bgColorClass = '';
    let pulseClass = '';
    
    if (isToday) {
      bgColorClass = 'bg-blue-500 text-white font-bold ring-2 ring-blue-300';
    } else if (hasDeliveries) {
      const highestPriorityStatus = dayDeliveries.find(d => d.status === 'in-progress') ? 'in-progress' :
                                   dayDeliveries.find(d => d.status === 'pending') ? 'pending' : 'completed';
      
      switch (highestPriorityStatus) {
        case 'pending':
          bgColorClass = 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 text-yellow-800 dark:text-yellow-200 border-2 border-yellow-400 dark:border-yellow-600 shadow-md';
          break;
        case 'in-progress':
          bgColorClass = 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 text-green-800 dark:text-green-200 border-2 border-green-400 dark:border-green-600 shadow-md';
          pulseClass = 'animate-pulse';
          break;
        case 'completed':
          bgColorClass = 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-800 dark:text-blue-200 border-2 border-blue-400 dark:border-blue-600 shadow-md';
          break;
      }
    }
    
    days.push(
      <div
        key={day}
        className={`p-1 text-center text-sm cursor-pointer rounded-lg transition-all duration-300 hover:scale-105 relative ${
          bgColorClass || 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
        } ${pulseClass}`}
        onClick={() => hasDeliveries ? setSelectedDelivery(dayDeliveries[0]) : null}
      >
        {hasDeliveries && (
          <>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce flex items-center justify-center">
              <span className="text-xs text-white font-bold">{dayDeliveries.length}</span>
            </span>
            <Package className="absolute top-0 left-0 w-3 h-3 text-blue-600 dark:text-blue-400" />
          </>
        )}
        <span className="relative z-10">{day}</span>
      </div>
    );
  }

  // Get upcoming deliveries (next 7 days)
  const upcomingDeliveries = deliveries.filter(delivery => {
    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);
    return delivery.date >= today && delivery.date <= weekFromNow;
  });

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Delivery Calendar</span>
          <Badge variant="secondary" className="ml-auto">
            {deliveries.length} Scheduled
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-4">
          {days}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-200 border border-yellow-400 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-200 border border-green-400 rounded animate-pulse"></div>
            <span className="text-gray-600 dark:text-gray-400">In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-200 border border-blue-400 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">Completed</span>
          </div>
        </div>
        
        {/* Upcoming Deliveries */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
          <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center">
            <Package className="w-4 h-4 mr-1" /> 
            Upcoming Deliveries ({upcomingDeliveries.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {upcomingDeliveries.map((delivery, idx) => (
              <div 
                key={delivery.id} 
                className={`p-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  delivery.status === 'in-progress' 
                    ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' 
                    : delivery.status === 'completed'
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                      : 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500'
                }`}
                onClick={() => setSelectedDelivery(delivery)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 dark:text-white text-sm">
                      {delivery.itemName} ({delivery.quantity} {delivery.unit})
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center mt-1">
                      <User className="w-3 h-3 mr-1" />
                      {delivery.supplierName}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {delivery.date.toLocaleDateString()}
                    </div>
                  </div>
                  <Badge 
                    variant={delivery.status === 'in-progress' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {delivery.status === 'in-progress' 
                      ? 'In Progress' 
                      : delivery.status === 'completed' 
                        ? 'Completed'
                        : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
            {upcomingDeliveries.length === 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                No upcoming deliveries in the next 7 days
              </div>
            )}
          </div>
        </div>

        {/* Selected Delivery Details Modal */}
        {selectedDelivery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full animate-scale-in">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Delivery Details
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedDelivery(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Item</label>
                  <p className="text-base font-medium text-gray-800 dark:text-white">
                    {selectedDelivery.itemName}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Quantity</label>
                    <p className="text-base text-gray-800 dark:text-white">
                      {selectedDelivery.quantity} {selectedDelivery.unit}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <Badge 
                      variant={selectedDelivery.status === 'in-progress' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {selectedDelivery.status === 'in-progress' 
                        ? 'In Progress' 
                        : selectedDelivery.status === 'completed' 
                          ? 'Completed'
                          : 'Pending'}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Supplier</label>
                  <p className="text-base text-gray-800 dark:text-white">
                    {selectedDelivery.supplierName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedDelivery.supplierContact}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Delivery Date</label>
                    <p className="text-base text-gray-800 dark:text-white">
                      {selectedDelivery.date.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Lead Time</label>
                    <p className="text-base text-gray-800 dark:text-white">
                      {selectedDelivery.leadTime} days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
