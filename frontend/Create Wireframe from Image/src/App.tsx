import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import {
  User,
  LogIn,
  Plus,
  Wand2,
  Calendar,
  Store,
} from "lucide-react";
import { EventAIPage } from "./components/EventAIPage";
import { SchedulePage } from "./components/SchedulePage";
import { VendorMarketplacePage } from "./components/VendorMarketplacePage";
import { SingleEventPage } from "./components/SingleEventPage";
import { LoginPage } from "./components/LoginPage";
import { PreferencesPage } from "./components/PreferencesPage";

type PageType =
  | "home"
  | "event-ai"
  | "schedule"
  | "vendors"
  | "event"
  | "login"
  | "preferences";

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<PageType>("home");
  const [selectedEventId, setSelectedEventId] = useState<
    string | undefined
  >();

  const placeholderCards = Array.from(
    { length: 6 },
    (_, i) => i + 1,
  );

  const handleNavigate = (page: string, eventId?: string) => {
    setCurrentPage(page as PageType);
    if (eventId) setSelectedEventId(eventId);
  };

  const handleEventCardClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentPage("event");
  };

  const renderHeader = () => (
    <header className="flex items-center justify-between mb-8 px-6 py-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-2 border-gray-800 rounded-full"></div>
        <button
          onClick={() => handleNavigate("home")}
          className="text-2xl hover:text-gray-600 transition-colors"
        >
          event sense
        </button>
      </div>

      <nav className="flex items-center gap-10">
        <button
          onClick={() => handleNavigate("event-ai")}
          className="flex items-center gap-2 hover:text-gray-600 transition-colors text-lg"
        >
          <Wand2 size={24} className="text-gray-800" />
          <span>Event AI</span>
        </button>
        <button
          onClick={() => handleNavigate("schedule")}
          className="flex items-center gap-2 hover:text-gray-600 transition-colors text-lg"
        >
          <Calendar size={24} className="text-gray-800" />
          <span>Schedule</span>
        </button>
        <button
          onClick={() => handleNavigate("vendors")}
          className="flex items-center gap-2 hover:text-gray-600 transition-colors text-lg"
        >
          <Store size={24} className="text-gray-800" />
          <span>Vendor Marketplace</span>
        </button>
      </nav>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-lg"
          onClick={() => handleNavigate("login")}
        >
          <LogIn size={20} />
          login
        </Button>
        <Button variant="ghost" size="icon" className="p-3">
          <User size={20} />
        </Button>
      </div>
    </header>
  );

  const renderHomePage = () => (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="flex items-center bg-white border border-gray-800 rounded-full p-2 gap-2 w-full max-w-2xl">
            <Input
              placeholder="Name"
              className="border-none bg-transparent focus-visible:ring-0 px-4"
            />
            <div className="w-px h-6 bg-gray-300"></div>
            <Input
              placeholder="Location"
              className="border-none bg-transparent focus-visible:ring-0 px-4"
            />
            <div className="w-px h-6 bg-gray-300"></div>
            <Input
              placeholder="Date"
              className="border-none bg-transparent focus-visible:ring-0 px-4"
            />
            <Button
              size="icon"
              className="rounded-full bg-gray-800 hover:bg-gray-700 flex-shrink-0"
            >
              <Plus size={16} className="text-white" />
            </Button>
          </div>
        </div>

        <Tabs value="events" className="w-full">
          <div className="hidden">
            <TabsList>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-8">
            <div className="h-px bg-gray-800 mb-8"></div>

            <TabsContent value="events" className="space-y-8">
              {/* Planned Events Section */}
              <section>
                <h2 className="mb-4">Planned Events</h2>
                <div className="flex gap-4 w-full">
                  {placeholderCards.map((card) => (
                    <Card
                      key={`planned-${card}`}
                      className="w-48 h-48 border-2 border-gray-800 bg-transparent hover:bg-white/50 transition-colors cursor-pointer flex-1"
                      onClick={() =>
                        handleEventCardClick(card.toString())
                      }
                    >
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        {card}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Past Events Section */}
              <section>
                <h2 className="mb-4">Past Events</h2>
                <div className="flex gap-4 w-full">
                  {placeholderCards.map((card) => (
                    <Card
                      key={`past-${card}`}
                      className="w-48 h-48 border-2 border-gray-800 bg-transparent hover:bg-white/50 transition-colors cursor-pointer flex-1"
                      onClick={() =>
                        handleEventCardClick(card.toString())
                      }
                    >
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        {card}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      case "preferences":
        return <PreferencesPage onNavigate={handleNavigate} />;
      case "event-ai":
        return <EventAIPage onNavigate={handleNavigate} />;
      case "schedule":
        return <SchedulePage onNavigate={handleNavigate} />;
      case "vendors":
        return (
          <VendorMarketplacePage onNavigate={handleNavigate} />
        );
      case "event":
        return (
          <SingleEventPage
            onNavigate={handleNavigate}
            eventId={selectedEventId}
          />
        );
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      {currentPage !== "login" && currentPage !== "preferences" && renderHeader()}
      {renderCurrentPage()}
    </div>
  );
}