'use client';

import React from 'react';
import type { LessonBlock } from '@/types/curriculum';
import { AccordionBlock } from '../blocks/AccordionBlock';
import { CalloutWarningBlock } from '../blocks/CalloutWarningBlock';
import { CodeLabBlock } from '../blocks/CodeLabBlock';
import { CodeViewBlock } from '../blocks/CodeViewBlock';
import { ComparisonTabsBlock } from '../blocks/ComparisonTabsBlock';
import { FlipCardsBlock } from '../blocks/FlipCardsBlock';
import { HeroHookBlock } from '../blocks/HeroHookBlock';
import { ImageBlock } from '../blocks/ImageBlock';
import { InteractiveSimBlock } from '../blocks/InteractiveSimBlock';
import { ListBlock } from '../blocks/ListBlock';
import { MatchingPairsBlock } from '../blocks/MatchingPairsBlock';
import { MediaPlayerBlock } from '../blocks/MediaPlayerBlock';
import { OrderFlowBuilderBlock } from '../blocks/OrderFlowBuilderBlock';
import { PredictOutputBlock } from '../blocks/PredictOutputBlock';
import { ProcessStepperBlock } from '../blocks/ProcessStepperBlock';
import { QuizQuestionBlock } from '../blocks/QuizQuestionBlock';
import { RichTextBlock } from '../blocks/RichTextBlock';
import { SortingBucketsBlock } from '../blocks/SortingBucketsBlock';
import { SpotBugBlock } from '../blocks/SpotBugBlock';
import { TableBlock } from '../blocks/TableBlock';
import type { BlockAttemptPayload } from '../blocks/types';

export interface BlockRendererProps {
  block: LessonBlock;
  onComplete?: (blockId: string, isCorrect: boolean) => void;
  onAttempt?: (
    blockId: string,
    blockType: LessonBlock['type'],
    payload: BlockAttemptPayload
  ) => void;
  onInteract?: (blockId: string, blockType: LessonBlock['type']) => void;
  className?: string;
}

export function BlockRenderer({
  block,
  onComplete,
  onAttempt,
  onInteract,
  className,
}: BlockRendererProps) {
  const handleComplete = (isCorrect: boolean) => {
    onComplete?.(block.id, isCorrect);
  };

  const handleAttempt = (payload: BlockAttemptPayload) => {
    onAttempt?.(block.id, block.type, payload);
  };

  const handleInteract = () => {
    onInteract?.(block.id, block.type);
  };

  switch (block.type) {
    case 'heroHook':
      return (
        <HeroHookBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'richText':
      return <RichTextBlock data={block.data} className={className} />;
    case 'listBlock':
      return (
        <ListBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'imageBlock':
      return <ImageBlock data={block.data} className={className} />;
    case 'mediaPlayer':
      return <MediaPlayerBlock data={block.data} className={className} />;
    case 'codeView':
      return (
        <CodeViewBlock
          data={block.data}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'processStepper':
      return <ProcessStepperBlock data={block.data} className={className} />;
    case 'tableBlock':
      return <TableBlock data={block.data} className={className} />;
    case 'accordionBlock':
      return (
        <AccordionBlock
          data={block.data}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'flipCards':
      return (
        <FlipCardsBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'comparisonTabs':
      return (
        <ComparisonTabsBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'calloutWarning':
      return <CalloutWarningBlock data={block.data} className={className} />;
    case 'quizQuestion':
      return (
        <QuizQuestionBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'sortingBuckets':
      return (
        <SortingBucketsBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'matchingPairs':
      return (
        <MatchingPairsBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'orderFlowBuilder':
      return (
        <OrderFlowBuilderBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'codeLab':
      return (
        <CodeLabBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'predictOutput':
      return (
        <PredictOutputBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'spotBug':
      return (
        <SpotBugBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
    case 'interactiveSim':
      return (
        <InteractiveSimBlock
          blockId={block.id}
          data={block.data}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          onInteract={handleInteract}
          className={className}
        />
      );
  }
}
