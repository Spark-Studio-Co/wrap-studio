<script lang="ts">
    // @ts-nocheck
    import CountUp from "svelte-countup";

    export let value: number;
    export let title: string;
</script>

<div class="flex flex-col items-center mb-10">
    <div class="text-primary font-gotham text-[64px] font-[500]">
        <CountUp
            initial={0}
            {value}
            duration={1000}
            step={1}
            roundto={1}
            format={true}
        />+
    </div>

    <span
        class="text-white font-mont-alter text-[20px] leading-[40px] text-center font-[500] italic"
    >
        {#each title.split(" ") as word}
            <span class="block break-words">{word}</span>
        {/each}
    </span>
</div>
