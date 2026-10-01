const CITATION_PATTERN = /\[\[S(\d+)\]\]/g;
const BUFFER_SIZE = 16;

export class RagCitationFilter {
    private buffer = '';
    private readonly sourceNumbers = new Set<number>();
    push(chunk: string): string {
        this.buffer += chunk;
        this.buffer = this.extractCitations(this.buffer);
        if (this.buffer.length <= BUFFER_SIZE) {
            return '';
        }
        const visible = this.buffer.slice(0, -BUFFER_SIZE);
        this.buffer = this.buffer.slice(-BUFFER_SIZE);
        return visible;
    }

    flush(): string {
        const visible = this.extractCitations(this.buffer);
        this.buffer = '';
        return visible;
    }

    getSourceNumbers(): number[] {
        return [
            ...this.sourceNumbers,
        ];
    }

    private extractCitations(value: string): string {
        return value.replace(
            CITATION_PATTERN,
            (_match, sourceNumber: string) => {
                this.sourceNumbers.add(Number(sourceNumber));
                return '';
            },
        );
    }
}