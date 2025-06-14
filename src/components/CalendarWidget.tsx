
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSupply } from '@/contexts/SupplyContext';
import { DeliveryEvent } from './calendar/types';
import { generateDeliveryEvents } from './calendar/utils/deliveryGenerator';
import { CalendarGrid } from './calendar/CalendarGrid';
import { DeliveryList } from './calendar/DeliveryList';
import { DeliveryModal } from './calendar/DeliveryModal';
import { CalendarLegend } from './calendar/CalendarLegend';

export const CalendarWidget: React.FC = () => {
  const [currentDate] = useState(new Date());
  const { transactions, suppliers, inventory } = useSupply();
  const [deliveries, setDeliveries] = useState<DeliveryEvent[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryEvent | null>(null);
  
  useEffect(() => {
    const events = generateDeliveryEvents(transactions, suppliers, inventory);
    setDeliveries(events);
  }, [transactions, suppliers, inventory]);

  const handleDeliveryClick = (delivery: DeliveryEvent) => {
    setSelectedDelivery(delivery);
  };

  const handleCloseModal = () => {
    setSelectedDelivery(null);
  };

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
        <CalendarGrid 
          currentDate={currentDate}
          deliveries={deliveries}
          onDayClick={handleDeliveryClick}
        />
        
        <CalendarLegend />
        
        <DeliveryList 
          deliveries={deliveries}
          onDeliveryClick={handleDeliveryClick}
        />

        <DeliveryModal 
          delivery={selectedDelivery}
          onClose={handleCloseModal}
        />
      </CardContent>
    </Card>
  );
};
